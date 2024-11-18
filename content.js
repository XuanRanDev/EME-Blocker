// 覆盖 navigator.requestMediaKeySystemAccess 方法
Object.defineProperty(navigator, 'requestMediaKeySystemAccess', {
    value: function () {
      console.warn('EME API has been disabled by EME Blocker.');
      return Promise.reject(new Error('EME API disabled by extension.'));
    },
    writable: false, // 防止被覆盖
    configurable: false
  });
  
  // 禁用 MediaKeySystemAccess 构造函数
  if (typeof MediaKeySystemAccess !== 'undefined') {
    window.MediaKeySystemAccess = class {
      constructor() {
        throw new Error('EME API disabled by extension.');
      }
    };
  }
  
  // 选填：拦截特定的其他 EME 方法
  console.log('EME Blocker script injected successfully.');
  