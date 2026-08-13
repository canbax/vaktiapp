/**
 * Computes the Levenshtein (edit) distance. Comparison is case-insensitive.
 */
export function levenshteinDistance(a: string, b: string): number {
  const s = a.toLocaleLowerCase();
  const t = b.toLocaleLowerCase();
  const m = s.length;
  const n = t.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => i);

  for (let j = 1; j <= n; j++) {
    let prev = dp[0];
    dp[0] = j;
    for (let i = 1; i <= m; i++) {
      const temp = dp[i];
      dp[i] = s[i - 1] === t[j - 1] ? prev : 1 + Math.min(prev, dp[i], dp[i - 1]);
      prev = temp;
    }
  }
  return dp[m];
}
