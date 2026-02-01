"use client";
import { useEffect } from 'react';

export default function TawkToChat() {
    useEffect(() => {
        // Create script element
        var Tawk_API = Tawk_API || {};
        var Tawk_LoadStart = new Date();
        
        (function() {
            var s1 = document.createElement("script");
            var s0 = document.getElementsByTagName("script")[0];
            
            s1.async = true;
            s1.src = 'https://embed.tawk.to/697f166d0f84561c35470a32/1jgc6v7qj';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            
            s0.parentNode.insertBefore(s1, s0);
        })();
    }, []);

    return null; // This component doesn't render anything visible
}
