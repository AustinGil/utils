function progressHelper(onProgress) {
  return response => {
    if (!response.body) return response;
    let loaded = 0;
    const contentLength = response.headers.get('content-length');
    const total = !contentLength ? -1 : parseInt(contentLength, 10);
    return new Response(
      new ReadableStream({
        start(controller) {
          const reader = response.body.getReader();
          return read();
          function read() {
            return reader
              .read()
              .then(({ done, value }) => {
                if (done) return void controller.close();
                loaded += value.byteLength;
                onProgress({ loaded, total });
                controller.enqueue(value);
                return read();
              })
              .catch(error => {
                console.error(error);
                controller.error(error);
              });
          }
        },
      })
    );
  };
}

fetch(url)
  .then(progressHelper(console.log)) // progressHelper used inside the .then()
  .then(response => response.blob());
