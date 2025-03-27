export default {
    async fetch(request, env) {
      let url = new URL(request.url);
      if (url.pathname.startsWith('/')) {
        url.hostname = 'pub-8a38c9993bf84440ad2a326d442b4635.r2.dev'//替换为你的存储桶给出的域名
        let new_request = new Request(url, request);
        return fetch(new_request);
      }
      return env.ASSETS.fetch(request);
    },
  };