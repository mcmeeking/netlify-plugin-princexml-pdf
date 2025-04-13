# Netlify Build Plugin: PrinceXML PDF Generator

This plugin generates a PDF from an HTML page using PrinceXML and saves it to
the publish directory during the Netlify build process. Inspired by
`netlify-plugin-generate-pdf`, it uses PrinceXML instead of Puppeteer for
high-quality PDF rendering.

## Features

- Generates a PDF from a specified URL.
- Supports custom PDF file names.
- Uses a provided PrinceXML license or defaults to a watermark-enabled version.

## Installation

Install this plugin via the Netlify app or add it to your `netlify.toml` file:

```toml
[[plugins]]
  package = "netlify-plugin-princexml-pdf"

  [plugins.inputs]
  url = "https://example.com"  # Required: Absolute URL to generate PDF from
  fileName = "output.pdf"      # Optional: Name of the generated PDF file (default: "index.pdf")
```

## Environment Variables

- `PRINCE_LICENSE` (Optional): Your PrinceXML license key. If not set, the PDF
  will include a watermark, and a note will appear in the build logs.

To set this in Netlify:

- Go to your site’s dashboard.
- Navigate to Environment variables under Settings > Build & deploy.
- Add PRINCE_LICENSE with your license key contents.

## Usage

- Set up a Netlify site.
- Install the plugin as described above.
- Configure the plugin in netlify.toml with the required url and optional
  fileName.
- Optionally, set the `PRINCE_LICENSE` environment variable in Netlify.
- Deploy your site. The plugin runs during the onPostBuild phase, generating the
  PDF and saving it to the publish directory.
