/**
 * @param {string} string_
 */
export function btoa(string_) {
  return Buffer.from(string_, 'binary').toString('base64');
}
