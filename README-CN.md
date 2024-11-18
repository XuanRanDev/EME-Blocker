
# **EME-Blocker**  
一个轻量级浏览器扩展，旨在禁用现代浏览器中的 **Encrypted Media Extensions (EME)** API。通过此扩展，用户可以阻止网站访问 DRM（数字版权管理）保护的媒体播放功能。

---

## **功能特点**  
- 禁用 `navigator.requestMediaKeySystemAccess` 方法，阻止对 EME API 的访问。  
- 阻止使用 `MediaKeySystemAccess` 构造函数，彻底禁用 EME 功能。  
- 轻量、简洁、无多余权限要求。  

---

## **安装步骤**  

### **1. 克隆或下载项目**  
通过以下命令克隆仓库，或下载项目的 ZIP 文件：  
```bash
git clone https://github.com/XuanRanDev/EME-Blocker.git
```

### **2. 加载扩展到浏览器**  
1. 打开浏览器的扩展程序页面：  
   - Chrome: `chrome://extensions/`  
   - Edge: `edge://extensions/`  
2. 启用 **开发者模式**。  
3. 点击 **加载已解压的扩展程序**，选择下载的 `EME-Blocker` 文件夹。

### **3. 验证安装**  
安装成功后，访问一个使用 EME 的网站（如 Netflix 或部分 YouTube 视频）。打开开发者控制台（`F12`），检查是否显示以下提示：  
```plaintext
EME API has been disabled by EME Blocker.
```

---

## **工作原理**  
该扩展通过内容脚本（`content.js`）注入页面，覆盖与 EME 相关的 API 方法：  
1. **`navigator.requestMediaKeySystemAccess`**：拦截对媒体密钥系统的请求，返回错误。  
2. **`MediaKeySystemAccess` 构造函数**：阻止网站通过该类使用 DRM 功能。  

注入的核心代码如下：  
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

## **权限要求**  
该扩展仅需要以下权限：  
- `content_scripts`：将屏蔽脚本注入网页环境。  
- `host_permissions`：允许脚本在所有 URL 上生效。  

---

## **兼容性**  
本扩展兼容以下浏览器：  
- Google Chrome 88+  
- Microsoft Edge 88+  
- 任何支持 Manifest V3 的浏览器  

---

## **注意事项**  
1. 禁用 EME API 可能会导致部分网站（如 Netflix、Hulu）无法正常播放受 DRM 保护的内容。  
2. 使用该扩展时，请确保用途合法，并遵守相关法律法规及网站的服务条款。  

---

## **贡献**  
欢迎贡献！如果您有改进建议或发现问题，可以通过提交 Issue 或 Pull Request 参与项目开发。  

---

## **许可证**  
本项目基于 [GPL3.0 许可证](LICENSE) 开源。  

---

## **鸣谢**  
感谢开源社区提供的灵感和技术支持，帮助实现浏览器 API 拦截的最佳实践。  
