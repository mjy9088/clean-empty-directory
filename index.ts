import { readdir, rmdir, stat } from "node:fs/promises";
import { join } from "node:path";

async function isDirectoryEmpty(directoryPath: string): Promise<boolean> {
  const files = await readdir(directoryPath);
  return files.length === 0;
}

async function removeEmptyDirectories(directoryPath: string) {
  const files = await readdir(directoryPath);

  for (const file of files) {
    const fullPath = join(directoryPath, file);
    if ((await stat(fullPath)).isDirectory()) {
      await removeEmptyDirectories(fullPath);
    }
  }

  if (await isDirectoryEmpty(directoryPath)) {
    await rmdir(directoryPath);
    console.log(`Removed empty directory: ${directoryPath}`);
  }
}

async function main() {
  const targetDirectory = process.argv[2];
  if (!targetDirectory) {
    console.error("Please provide a directory path.");
    process.exit(1);
  }
  await removeEmptyDirectories(targetDirectory);
}

main();
