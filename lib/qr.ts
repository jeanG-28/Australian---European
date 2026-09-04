import QRCode from "qrcode";

export async function studentQrDataUri(studentId: string, issuedAt: number): Promise<string> {
  const payload = `AEP-ACCESS:${studentId}:${issuedAt}`;
  return QRCode.toDataURL(payload, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 260,
    color: {
      dark: "#16233f",
      light: "#00000000",
    },
  });
}
