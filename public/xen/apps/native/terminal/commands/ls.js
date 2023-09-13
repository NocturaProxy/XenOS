export const help = async (args, process) => {
    const { fs } = process;

    return `
        ls - list files in a directory
    `;
}

export const run = async (args, process) => {
    const { fs, colors } = process;
    const [ dir = "./" ] = args;

    const files = await fs.readdir(dir);

    process.write("\r\n");

    console.log(colors);

    for (const file of files) {
        const stat = await fs.stat(process.path.join(dir, file));

        if (stat.isDirectory())
            process.write(colors.cyan(file) + "  ");
        else if (stat.isFile())
            process.write(colors.white(file) + "  ");
    }

    return true;
}