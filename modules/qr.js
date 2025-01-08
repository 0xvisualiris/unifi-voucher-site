/**
 * Generates a QR code from the UniFi SSID (Scan to Connect)
 *
 * @param buffer
 * @return {Promise<unknown>}
 */
module.exports = (buffer = false) => {
    return new Promise((resolve) => {
        const wifiData = `WIFI:S:${variables.unifiSsid};T:${variables.unifiSsidPassword !== '' ? 'WPA' : 'nopass'};P:${variables.unifiSsidPassword !== '' ? variables.unifiSsidPassword : ''};;`;

        if (!buffer) {
            QRCode.toDataURL(wifiData, { version: 4, errorCorrectionLevel: 'Q' }, (err, url) => {
                if (err) {
                    log.error(`[Qr] Error while generating code!`);
                    log.error(err);
                }
                resolve(url);
            });
        } else {
            QRCode.toBuffer(wifiData, { version: 4, errorCorrectionLevel: 'Q' }, (err, buffer) => {
                if (err) {
                    log.error(`[Qr] Error while generating code!`);
                    log.error(err);
                }
                resolve(buffer);
            });
        }
    });
};
