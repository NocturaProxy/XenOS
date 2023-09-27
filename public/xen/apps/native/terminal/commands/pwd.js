export const help = async (args, process) => {
    const { fs } = process;

    return `
        pwd - process working directory
    `;
}

export const run = async (args, process) => {
    const { fs } = process;

    process.write("\r\n");
    process.write(fs.cwd());

    return true;
}