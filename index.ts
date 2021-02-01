import config from 'config';
import { startActiveBackupSync } from './src/core/db/active-backup-service';
import { initiateMongoClient } from './src/core/db/mongo-client';
import { DBConfig } from './src/models/db-config';
import { MongoClientRole } from './src/models/mongo-client-role';
import { logError, logInfo } from './src/utils/logger/logger';

(async () => {
  try {
    logInfo('Starting mongo-backup server');
    const activeClient = await initiateMongoClient(config.get<DBConfig>('activeDBConfig').connectionString, MongoClientRole.ACTIVE);
    const backupClient = await initiateMongoClient(config.get<DBConfig>('backupDBConfig').connectionString, MongoClientRole.BACKUP);

    config.get<DBConfig>('activeDBConfig').dbList.forEach(db => {
      startActiveBackupSync(activeClient.db(db), backupClient.db(db));
    });
  } catch (err) {
    logError(err);
  }
})();
