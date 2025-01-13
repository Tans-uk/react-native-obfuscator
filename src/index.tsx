import ReactNativeObfuscator from './NativeReactNativeObfuscator';
export { default as obfuscatorTransformer } from './metroPlugin';

export function multiply(a: number, b: number): number {
  return ReactNativeObfuscator.multiply(a, b);
}
