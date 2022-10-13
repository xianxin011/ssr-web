import FingerprintJS from "@fingerprintjs/fingerprintjs";

const fpPromise = FingerprintJS.load();

const getFingerPrint = async () => {
  const fp = await fpPromise;
  const res = await fp.get();
  return res.visitorId;
};
export default getFingerPrint;
