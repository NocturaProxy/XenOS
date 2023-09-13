export const help = async (args, process) => {
    const { fs } = process;

    return `
        ls - delete files
    `;
}

export const run = async (args, process) => {
    const { fs } = process;

    for (var arg of args) {
        if (arg.startsWith("-") || arg.startsWith("--")) 
            continue;
        await fs.unlink(arg);
    }

    return true;
}