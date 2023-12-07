import { getReleaseInformation } from '../queries/releaseInformationQuery';

const releaseInformation = await getReleaseInformation();

const dataDragonVersion = releaseInformation.data.version;

export default dataDragonVersion;
