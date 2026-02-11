const singularize = (word) => {
    const lower = word.toLowerCase().trim();

    // Casos especiales
    if (lower.endsWith('ces')) return lower.slice(0, -3) + 'z'; // lápices → lápiz
    if (lower.endsWith('es')) return lower.slice(0, -2); // unidades → unidad, metros → metro
    if (lower.endsWith('s')) return lower.slice(0, -1); // rollos → rollo, litros → litro

    return lower; // ya está en singular
};

const isFeminine = (word) => {
    const lower = word.toLowerCase().trim();
    // Casos comunes femeninos en español
    if (lower.endsWith('a') || lower.endsWith('d') || lower.endsWith('ión')) return true;
    return false;
};

export const getAddedMessage = (quantity, unit, name) => {
    const normalized = unit.toLowerCase().trim();
    const singular = singularize(normalized);
    const feminine = isFeminine(singular);

    const unitLabel = quantity === 1 ? singular : normalized;

    const verbo =
        quantity === 1 ? (feminine ? 'añadida' : 'añadido') : feminine ? 'añadidas' : 'añadidos';

    return `${quantity} ${unitLabel} de ${name} ${verbo}`;
};
