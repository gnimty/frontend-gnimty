export default async function copyText(textToCopy: string, successText: string) {
  await navigator.clipboard.writeText(textToCopy);
  alert(successText);
}
