import obfuscatorTransformer from '../metroPlugin';

describe('obfuscatorTransformer', () => {
  it('should obfuscate JavaScript code', () => {
    const transformer = obfuscatorTransformer(
      { compact: true },
      { runInDev: true, logObfuscatedFiles: false }
    );

    const result = transformer.transform({
      src: 'const x = 1;',
      filename: 'test.js',
      options: { dev: true },
    });

    expect(result.code).not.toContain('const x = 1;');
  });

  it('should skip obfuscation for excluded file extensions', () => {
    const transformer = obfuscatorTransformer({}, { fileExtensions: ['ts'] });

    const result = transformer.transform({
      src: 'const x = 1;',
      filename: 'test.js',
      options: {},
    });

    expect(result.code).toBe('const x = 1;');
  });
});
