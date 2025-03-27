export default {
    async fetch(request, env) {
      let url = new URL(request.url);
      const path = url.pathname.replace(/^\//, '');
      if (path) {
        url.hostname = 'pub-8a38c9993bf84440ad2a326d442b4635.r2.dev';
        let new_request = new Request(url, request);
        return fetch(new_request);
      }
      return env.ASSETS.fetch(request);
    },
  };