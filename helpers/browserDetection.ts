
export default function getBrowser() {
    let userAgent = navigator.userAgent;
    let browser = "Unknown";
    
    // Detect Chrome
    if (/Chrome/.test(userAgent) && !/Chromium/.test(userAgent)) {
        browser = "Google Chrome";
    }
    // Detect Chromium-based Edge
    else if (/Edg/.test(userAgent)) {
        browser = "Microsoft Edge";
    }
    // Detect Firefox
    else if (/Firefox/.test(userAgent)) {
        browser = "Mozilla Firefox";
    }
    // Detect Safari
    else if (/Safari/.test(userAgent)) {
        browser = "Apple Safari";
    }
    // Detect Internet Explorer
    else if (/Trident/.test(userAgent)) {
        browser = "Internet Explorer";
    }
    
    return browser;
}

