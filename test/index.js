import test from 'ava'
import { fileURLToPath } from 'url'

import netlifyBuild from '@netlify/build'

const NETLIFY_CONFIG = fileURLToPath(
  new URL('../netlify.toml', import.meta.url),
)

// Unit tests are using the AVA test runner: https://github.com/avajs/ava
// A local build is performed using the following command:
//   netlify-build --config ../netlify.toml
// Please see this netlify.toml configuration file. It simply runs the
// Build plugin.
// This is a smoke test. You will probably want to write more elaborate unit
// tests to cover your plugin's logic.
test('Netlify Build should not fail', async (t) => {
  const { success, logs } = await netlifyBuild({
    config: NETLIFY_CONFIG,
    buffer: true,
  })

  // Netlify Build output
  console.log(
    [logs.stdout.join('\n'), logs.stderr.join('\n')]
      .filter(Boolean)
      .join('\n\n'),
  )

  // Check that build succeeded
  t.true(success)
})

test('Netlify Build should print a message that the license was not found by default', async (t) => {
  const { logs } = await netlifyBuild({
    config: NETLIFY_CONFIG,
    buffer: true,
  })

  // Netlify Build output
  console.log(
    [logs.stdout.join('\n'), logs.stderr.join('\n')]
      .filter(Boolean)
      .join('\n\n'),
  )

  // Check that build succeeded
  t.true(logs.stdout.some((line) => line.includes('Prince license not found')))
})

test('Netlify Build should not print a license missing message if the license was found', async (t) => {
  const { logs } = await netlifyBuild({
    config: NETLIFY_CONFIG,
    buffer: true,
    env: {
      PRINCE_LICENSE: 'test-license-value',
    },
  })

  // Netlify Build output
  console.log(
    [logs.stdout.join('\n'), logs.stderr.join('\n')]
      .filter(Boolean)
      .join('\n\n'),
  )

  // Check that build succeeded
  t.true(
    logs.stdout.some((line) => line.includes('PDF generated successfully')),
  )
  t.false(logs.stdout.some((line) => line.includes('Prince license not found')))
})
