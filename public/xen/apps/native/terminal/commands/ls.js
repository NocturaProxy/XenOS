export const help = async (args, process) => {
    const { fs } = process;

    return `
        ls - list files in a directory
    `;
}

export const run = async (args, process) => {
    const { fs } = process;
    const [dir] = args;

    console.log(args);

    const files = await fs.readdir(dir);

    process.write("\r\n");

    for (const file of files) {
        process.write(file + "\r\n");
    }

    process.write("\r\n");

    return true;
}