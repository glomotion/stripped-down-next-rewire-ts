import Document, { Head, Html, Main, NextScript } from "next/document";
import { cache } from "@emotion/css";
import createEmotionServer from "@emotion/server/create-instance";

export const isProductionEnvironment = process.env.NODE_ENV === "production";

export const renderStatic = async (html) => {
  if (html === undefined) {
    throw new Error("did you forget to return html from renderToString?");
  }
  const { extractCritical } = createEmotionServer(cache);
  const { ids, css } = extractCritical(html);

  return { html, ids, css };
};

export default class RewireAppDocument extends Document {
  static async getInitialProps(ctx) {
    const page = await ctx.renderPage();
    const initialProps = await Document.getInitialProps(ctx);

    // SSR emotion styles in production only
    if (isProductionEnvironment) {
      const { css, ids } = await renderStatic(page.html);
      return {
        ...initialProps,
        styles: (
          <>
            <style
              data-emotion={`css ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
            {initialProps.styles}
          </>
        ),
      };
    }

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
