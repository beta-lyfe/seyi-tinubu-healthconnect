const port = process.env.MEDIA_SERVER_PORT as unknown as number

const config = {
  server: {
    url: `http://127.0.0.1:${port}`,
    port
  }
}

export default config
