import JavaScriptObfuscator, {
  type ObfuscatorOptions,
} from 'javascript-obfuscator';
import path from 'path';

interface ObfuscatorPluginOptions {
  fileExtensions?: string[];
  runInDev?: boolean;
  logObfuscatedFiles?: boolean;
}

const obfuscatorTransformer = (
  obfuscatorOptions: ObfuscatorOptions = {},
  pluginOptions: ObfuscatorPluginOptions = {}
) => {
  const {
    fileExtensions = ['js', 'jsx', 'ts', 'tsx'],
    runInDev = false,
    logObfuscatedFiles = false,
  } = pluginOptions;

  return {
    transform({
      src,
      filename,
      options,
    }: {
      src: string;
      filename: string;
      options: any;
    }) {
      if (!runInDev && options.dev) {
        return { code: src, map: null };
      }

      const fileExtension = path.extname(filename).slice(1);
      if (!fileExtensions.includes(fileExtension)) {
        return { code: src, map: null };
      }

      const obfuscatedResult = JavaScriptObfuscator.obfuscate(src, {
        compact: true,
        controlFlowFlattening: true,
        ...obfuscatorOptions,
      });

      if (logObfuscatedFiles) {
        console.log(`Obfuscated: ${filename}`);
      }

      return {
        code: obfuscatedResult.getObfuscatedCode(),
        map: obfuscatedResult.getSourceMap(),
      };
    },
  };
};

export default obfuscatorTransformer;
