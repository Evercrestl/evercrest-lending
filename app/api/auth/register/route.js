import { connectDB } from "@/lib/config/db";
import sendVerificationEmail from "@/lib/sendVerificationEmail";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { rateLimit } from "@/lib/rateLimit";
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";


export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit({
    windowMs: 1000 * 60, // 1 minute
    max: 5,
    key: `register_${ip}`,
  });

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }
  try {
    await connectDB();
    const body = await req.json();
    const {
      name,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      latitude,
      longitude,
      workStatus,
      workStatusOther,
      loanType,
      loanAmount,
      repaymentMonths,
      idDocumentBase64, // Base64 encoded ID document
      idDocumentFilename
    } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(body.password)) {
      return NextResponse.json(
        { error: "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character (@$!%*?&)" },
        { status: 400 }
      );
    }

    // 1. SANITIZE PHONE NUMBER
    // This removes everything except digits (strips +, spaces, dashes)
    const sanitizedPhoneNumber = body.phoneNumber.replace(/\D/g, '');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification token
    const token = crypto.randomBytes(32).toString("hex");

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Validate minimum loan amount
    if (parseFloat(loanAmount) < 10000) {
      return NextResponse.json(
        { error: "Minimum loan amount is ₱10,000" },
        { status: 400 }
      );
    }

    let idDocumentData = null;
    if (idDocumentBase64) {
      try {
        const uploadResult = await uploadToCloudinary(
          idDocumentBase64,
          'id-documents',
          `${email.replace('@', '_at_')}_${Date.now()}` // Custom public ID
        );

        idDocumentData = {
          filename: idDocumentFilename,
          url: uploadResult.url,
          publicId: uploadResult.publicId,
          format: uploadResult.format,
          bytes: uploadResult.bytes,
          uploadedAt: new Date()
        };
      } catch (uploadError) {
        console.error('ID document upload error:', uploadError);
        return NextResponse.json(
          { error: "Failed to upload ID document" },
          { status: 500 }
        );
      }
    }

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      location: {
        latitude,
        longitude
      },
      workStatus,
      workStatusOther: workStatus === "other" ? workStatusOther : undefined,
      loanType,
      loanAmount: parseFloat(loanAmount),
      repaymentMonths: parseInt(repaymentMonths),
      idDocument: idDocumentData,
      approved: true, // Auto-approve for demo (change in production)
      approvedAt: new Date()
    });

    await newUser.save();

    // Return user without sensitive data
    const userResponse = newUser.toJSON();

     return NextResponse.json({
      success: true,
      message: "Registration successful",
      user: userResponse
    }, { status: 201 });

  } catch (error) {
    console.error("Registration error:", error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: errors.join(', ') },
        { status: 400 }
      );
    }

    const user = await User.create({
      ...body,
      phoneNumber: sanitizedPhoneNumber, // Overwrite with sanitized version
      password: hashedPassword,
      loanBalance: Number(body.loanAmount),
      verificationToken: token,
      verificationTokenExpires: Date.now() + 1000 * 60 * 15  // 15 mins
    });

    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}

    // const user = await User.create({
    //   ...body,
    //   phoneNumber: sanitizedPhoneNumber, // Overwrite with sanitized version
    //   password: hashedPassword,
    //   loanBalance: Number(body.loanAmount),
    //   verificationToken: token,
    //   verificationTokenExpires: Date.now() + 1000 * 60 * 15  // 15 mins
    // });

    // Send verification email (placeholder)
    // sendVerificationEmail(user.email, token).catch((err) => {
    //   console.error("EMAIL ERROR:", err.message);
    // });


    // return NextResponse.json({ success: true });
  // } catch (error) {
//     console.error("REGISTER ERROR:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

