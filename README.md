# **EME-Blocker**  
A lightweight browser extension designed to disable the **Encrypted Media Extensions (EME)** API in modern web browsers. This extension is useful for users who want to prevent websites from accessing DRM-protected media playback functionality through EME.

---

## **Features**  
- Disables `navigator.requestMediaKeySystemAccess` to block EME API access.  
- Prevents the use of `MediaKeySystemAccess` constructor.  
- Simple and lightweight, with minimal permissions.  

---

## **Installation**  

### **1. Clone or Download**  
Clone this repository or download the ZIP file:  
```bash
git clone https://github.com/XuanRanDev/EME-Blocker.git
```

### **2. Load Extension into Browser**  
1. Open your browser's extensions page:  
   - Chrome: `chrome://extensions/`  
   - Edge: `edge://extensions/`  
2. Enable **Developer Mode**.  
3. Click **Load unpacked** and select the downloaded `EME-Blocker` directory.  

### **3. Verify Installation**  
After installation, visit a website using the EME API (e.g., Netflix or YouTube). Open the developer console (`F12`) to confirm that the API has been successfully blocked.

---

## **How It Works**  
This extension injects a content script into web pages to override the EME-related APIs:  
1. **`navigator.requestMediaKeySystemAccess`**: Prevents websites from accessing media key systems.  
2. **`MediaKeySystemAccess` constructor**: Throws an error if used, disabling DRM playback functionality.

Injected script (`content.js`):  
```javascript
Object.defineProperty(navigator, 'requestMediaKeySystemAccess', {
  value: function () {
    console.warn('EME API has been disabled by EME Blocker.');
    return Promise.reject(new Error('EME API disabled by extension.'));
  },
  writable: false,
  configurable: false
});

if (typeof MediaKeySystemAccess !== 'undefined') {
  window.MediaKeySystemAccess = class {
    constructor() {
      throw new Error('EME API disabled by extension.');
    }
  };
}
```

---

## **Permissions**  
This extension requires minimal permissions:  
- `content_scripts`: To inject the disabling script into web pages.  
- `host_permissions`: Ensures the script runs on all URLs.

---

## **Compatibility**  
This extension is compatible with:  
- Google Chrome 88+  
- Microsoft Edge 88+  
- Any browser supporting Manifest V3  

---

## **Limitations**  
- Disabling EME may cause some websites to malfunction, especially those that require DRM for media playback (e.g., Netflix, Hulu).  
- Ensure compliance with local laws and website terms of service before use.

---

## **Contributing**  
Contributions are welcome! Feel free to open issues or submit pull requests to improve the functionality or compatibility of this project.

---

## **License**  
This project is licensed under the [MIT License](LICENSE).  

---

## **Acknowledgments**  
Special thanks to the open-source community for inspiration and guidance on browser API interception techniques.
