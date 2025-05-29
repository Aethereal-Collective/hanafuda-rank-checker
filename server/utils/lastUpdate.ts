import { readFile, writeFile, mkdir } from "fs/promises";
import { resolve, dirname } from "path";

const filePath = resolve("server/data/last-updated.json");

export async function getLastUpdated(): Promise<string | null> {
	try {
		const data = await readFile(filePath, "utf-8");
		const json = JSON.parse(data);
		return json.lastUpdated;
	} catch (err) {
		console.error("Failed to read last-updated.json:", err);
		return null;
	}
}

export async function setLastUpdated(date: Date): Promise<void> {
	const dir = dirname(filePath);

	try {
		// Pastikan foldernya ada
		await mkdir(dir, { recursive: true });

		// Simpan JSON
		const json = { lastUpdated: date.toISOString() };
		await writeFile(filePath, JSON.stringify(json, null, 2));
	} catch (err) {
		console.error("Failed to write last-updated.json:", err);
	}
}
