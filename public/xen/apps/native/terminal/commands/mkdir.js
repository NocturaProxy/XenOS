export const help = async (args, process) => {
    const { fs } = process;

    return `
        mkdir - create a directory
    `;
}

export const run = async (args, process) => {
    const { fs } = process;
    const [ dir = "./" ] = args;

    await fs.mkdir(dir);

    return true;
}