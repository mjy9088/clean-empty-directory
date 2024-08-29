import { readdir, rmdir, stat } from "node:fs/promises";
import { join } from "node:path";

async function isDirectoryEmpty(directoryPath: string): Promise<boolean> {
  const files = await readdir(directoryPath);
  return files.length === 0;
}

async function main() {
  const [_, __, ...targetDirectories] = process.argv;
  if (targetDirectories.length === 0) {
    console.error("Please provide a directory path.");
    process.exit(1);
  }

  let status = 0;

  for (const targetDirectory of targetDirectories) {
    await removeEmptyDirectory(targetDirectory);
  }

  process.exit(status);

  async function removeEmptyDirectory(directoryPath: string) {
    try {
      const files = await readdir(directoryPath);

      for (const file of files) {
        const fullPath = join(directoryPath, file);
        if ((await stat(fullPath)).isDirectory()) {
          await removeEmptyDirectory(fullPath);
        }
      }

      if (await isDirectoryEmpty(directoryPath)) {
        await rmdir(directoryPath);
        console.log(`Removed empty directory: ${directoryPath}`);
      }
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
      status = 1;
    }
  }
}
main().catch((error) => console.error(error));
