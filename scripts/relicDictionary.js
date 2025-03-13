

let relic = {}


function rogueRandomGear(itemSlot) {
    const headItems = itemInventoryMemory.filter(item => item.slot === itemSlot);
    if (headItems.length > 0) {
        const randomItem = headItems[Math.floor(Math.random() * headItems.length)];
        spawnItem(randomItem.constructor);
    }
    return null; // Si no hay ítems con slot "Head"
}





relic.AreaSparkly = {
    name: 'A sparkly dream',
    description : function() { return `Dream about something sweet...` },
    difficulty : 1,
    act: 1,
    tag: 'Area',
    effect : function() { stats.rogue.areaDifficulty = this.difficulty; stats.rogue.stageName = "Sparkly" }
}

relic.AreaScurvy = {
    name: 'A scurvy dream',
    description : function() { return `Dream about the high seas...` },
    difficulty : 2,
    act: 2,
    tag: 'Area',
    effect : function() { stats.rogue.areaDifficulty = this.difficulty; stats.rogue.stageName = "" }
}

relic.AreaSinister = {
    name: 'A sinister dream',
    description : function() { return `Dream about a scary place...` },
    difficulty : 3,
    act: 3,
    tag: 'Area',
    effect : function() { stats.rogue.areaDifficulty = this.difficulty; stats.rogue.stageName = "" }
}







relic.RandomWeapon = {
    name: 'Random Weapon',
    description : function() { return `Receive a random weapon` },
    svg : `<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 24 24"><path fill="currentColor" d="m7.048 13.406l3.535 3.536l-1.413 1.414l1.415 1.415l-1.414 1.414l-2.475-2.475l-2.829 2.829l-1.414-1.414l2.829-2.83l-2.475-2.474l1.414-1.414l1.414 1.413zM3 3l3.546.003l11.817 11.818l1.415-1.414l1.415 1.414l-2.475 2.475l2.828 2.829l-1.414 1.414l-2.829-2.829l-2.474 2.475l-1.415-1.414l1.414-1.415L3.002 6.531zm14.457 0L21 3.003l.002 3.523l-4.053 4.052l-3.536-3.535z"/></svg>`,
    quality : `Common`,
    tag: 'Equip',
    effect : function() { rogueRandomGear("Weapon") }
}

relic.RandomHelmet = {
    name: 'Random Helmet',
    description : function() { return `Receive a random helmet` },
    svg : `<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 512 512"><path fill="currentColor" d="M258.094 18.5c-74.34 0-138.073 62.498-156.188 148.438c52.758-7.697 102.23-22.044 153.938-45.094l4.125-1.813l3.967 2.064c49.424 25.667 97.648 41.026 150.657 46.406c-17.66-86.744-81.71-150-156.5-150zm1.28 122.156c-57.41 25.148-112.883 39.993-172.53 47c6.724 32.847 6.91 65.935-.5 98.938c89.29 41.602 231.648 43.154 340.594-.125c-10.762-32.516-11.727-65.66-1.188-98.408c-59.03-4.235-112.628-20.06-166.375-47.406zm-13.5 33.125h18.72v127.75h-18.72V173.78zm-58.78 11.19h18.687v101.655h-18.686V184.97zm115.72 0H321.5v101.655h-18.688V184.97zm-171.72 14.905h18.687v79.28h-18.686zm227.72 0H377.5v79.28h-18.688v-79.28zm38.748 116.75c-14.302 4.282-28.96 7.873-43.78 10.844l-19.22 64.06c26.114-17.337 48.002-43.31 63-74.905zm-277.53 2.875c13.95 28.257 33.448 51.85 56.562 68.53l-17.688-58.905c-13.397-2.61-26.387-5.826-38.875-9.625zm213.156 11.656c-51.63 8.175-104.745 8.588-153.72 1.438l20.845 69.5c18 8.52 37.49 13.187 57.78 13.187c18.588 0 36.507-3.92 53.22-11.124zm-195.5 47.156c-19.436 21.562-36.416 44.367-48.594 72.157c70.233-8.736 133.743 14.684 168.03 50.75c39.684-35.607 103.71-55.685 170.876-44.25c-15.08-29.372-33.32-51.982-53.938-74c-31.187 31.75-71.53 51-115.968 51c-46.568 0-88.65-21.142-120.406-55.658z"/></svg>`,
    quality : `Common`,
    tag: 'Equip',
    effect : function() { rogueRandomGear("Head") }
}

relic.RandomChestplate = {
    name: 'Random Chestplate',
    description : function() { return `Receive a random chestplate` },
    svg : `<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 512 512"><path fill="currentColor" d="M156.7 25.83L89 39.38c-.1 58.57-1.74 119.32-43.49 167.22C104.4 246.5 189 260.7 247 248.8v-99L108.3 88.22l7.4-16.44L256 134.2l140.3-62.42l7.4 16.44L265 149.8v99c58 11.9 142.6-2.3 201.5-42.2c-41.8-47.9-43.4-108.65-43.5-167.22l-67.7-13.55c-12.9 13.88-20.6 28.15-32.9 40.53C308.9 79.78 289.5 89 256 89s-52.9-9.22-66.4-22.64c-12.3-12.38-20-26.65-32.9-40.53M53.88 232.9C75.96 281 96.07 336.6 102.7 392.8l65 22.8c4.2-52.7 28.2-104 63.7-146.1c-55.1 6.3-122.7-5.8-177.52-36.6m404.22 0c-54.8 30.8-122.4 42.9-177.5 36.6c35.5 42.1 59.5 93.4 63.7 146.1l65.2-22.9c6.6-56.8 26.6-111.8 48.6-159.8M256 269c-40.5 43.1-67.7 97.9-70.7 152.7l61.7 21.6V336h18v107.3l61.7-21.6c-3.1-54.8-30.2-109.6-70.7-152.7m151.7 143.4L297 451.1v18.8l110.2-44.1c.1-4.5.3-8.9.5-13.4m-303.3.1c.3 4.5.4 8.9.5 13.4l110.1 44v-18.7zM279 457.4l-23 8.1l-23-8v19.6l23 9.2l23-9.2z"/></svg>`,
    quality : `Common`,
    tag: 'Equip',
    effect : function() { rogueRandomGear("Chest") }
}

relic.RandomBoots = {
    name: 'Random Boots',
    description : function() { return `Receive random boots` },
    svg : `<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 512 512"><path fill="currentColor" d="M334.5 85.22c-31.403.523-69.44 13.372-100.563 42.81l17.594 215.407l-6.468 77.657h58.125l15.282-37.72l21.124 37.72h151.53c7.896-58.587-44.23-130.167-74.53-130.375l-16.53 1.124c-36.103 7.265-49.647 27.03-66.314 49.78l-4.28 5.845l-6.72-2.69l-13.03-5.25l-14.283 36.595l-17.406-6.78l14.376-36.783l-11.906-4.78l-8.563-3.438l3.313-8.594c7.98-20.727 20.735-40.35 38.906-54.156c14.907-11.326 33.593-18.483 55.156-18.688c1.438-.013 2.88.014 4.344.063c1.917.063 3.856.167 5.813.343l2.5-18.157c-26.083-16.097-67.526-14.873-103.72-.72l-6.78-17.405c20.11-7.864 41.785-12.5 62.655-12.56c17.98-.054 35.357 3.307 50.563 10.874l5.593-40.656c-31.286-27.418-77.42-24.612-119.374-.594l-9.28-16.22c23.566-13.49 49.485-21.265 74.312-21.31c20.46-.04 40.183 5.176 57.28 16.78l2.188-15.844c.354-1.526.61-3.013.78-4.47c.002-.02 0-.04.002-.06c.357-10.548-4.066-18.356-12.938-25c-9.483-7.103-24.383-11.937-42.03-12.657a117 117 0 0 0-6.72-.094zm-194.406 77.31c-.838.01-1.678.03-2.5.064c-13.162.537-24.16 4.175-30.938 9.25c-6.776 5.075-9.702 10.64-8.937 18.844l-.595.062c.132 1.234.324 2.514.625 3.813l2.313 16.718c10.807-7.494 23.1-11.163 35.53-11.093c17.786.102 35.61 7.284 51.782 19.25l-11.094 15c-13.73-10.16-28.064-15.49-40.81-15.562c-11.988-.068-22.776 4.042-32.407 14.344l4.406 31.843c8.974-4.182 18.787-6.078 28.843-6.063c14.792.022 30.092 4.157 44 11.188l-8.438 16.687c-21.797-11.02-45.487-12.505-61.688-2l2.032 14.72a88 88 0 0 1 2.5-.064c14.633-.1 27.16 4.06 37.343 11.25c14.48 10.227 24.226 25.514 32.625 41.595l4.28 8.25l-8.218 4.344l-8.47 4.467L186 394.875l-16.438 8.875l-13.812-25.594l-9.156 4.844l-6.344 3.344l-4.875-5.25c-16.32-17.62-29.136-32.608-60.406-35.188l-9-.75c-32.087 15.312-47.556 38.284-42.44 76.25h190.44l-5.095-59.687l-.03-.064l13.593-162.625c-24.97-26.094-56.98-36.796-82.344-36.5zm229.344 99.032c-17.593.075-31.926 5.756-43.97 14.907c-12.36 9.39-22.03 22.778-29 37.592l26.657 10.72c14.056-18.898 30.816-38.795 61.813-48.344l-8.032-14.47c-1.3-.105-2.638-.295-3.906-.343a87 87 0 0 0-3.563-.063zM116.594 318c-4.288-.028-9.038.543-14.28 1.625l-9 10.656c23.388 6.11 38.254 19.727 50.75 32.94l10.655-5.626l8.843-4.688c-6.628-11.382-13.846-20.917-22.282-26.875c-6.494-4.586-13.685-7.535-22.874-7.967c-.593-.028-1.2-.06-1.812-.063z"/></svg>`,
    quality : `Common`,
    tag: 'Equip',
    effect : function() { rogueRandomGear("Feet") }
}

relic.RandomGreaves = {
    name: 'Random Greaves',
    description : function() { return `Receive random greaves` },
    svg : `<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 512 512"><path fill="currentColor" d="M89.452 32v44.667l166.75 28.9l166.75-28.9V32l-166.75 28.902zm-.405 69.444v186.712c49.478 16.004 90.187 8.72 139.67 0c1.14-34.244 12.925-60.635 27.09-60.672c14.165.04 25.95 26.428 27.09 60.672c49.472 16.003 90.173 8.72 139.65 0V101.444l-166.74 28.813zm0 212.25v69.186c45.914 7.332 85.747 13.896 131.648 0v-69.186c-45.915 7.33-85.747 13.895-131.648 0m201.853 0v69.186c45.914 7.332 85.747 13.896 131.648 0v-69.186c-45.915 7.33-85.747 13.895-131.648 0m-198.44 94.55v64.2c43.532 6.802 81.302 12.893 124.823 0v-64.2c-43.534 6.8-81.303 12.893-124.824 0zm201.854 0v64.2c43.533 6.802 81.3 12.893 124.822 0v-64.2c-43.534 6.8-81.3 12.893-124.822 0"/></svg>`,
    quality : `Common`,
    tag: 'Equip',
    effect : function() { rogueRandomGear("Legs") }
}

relic.RandomRing = {
    name: 'Random Accessory',
    description : function() { return `Receive a random accessory` },
    svg : `<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 512 512"><path fill="currentColor" d="M102.6 34.33c-7.03 7-19.03 19.24-32.07 34.6c25.53 3.3 56.47 11.09 84.97 19.76c18.8 5.72 36.4 11.81 50.2 17.41c7 2.8 13 5.5 17.9 7.9c4.9 2.5 8.4 4.4 11.6 7.6l-12.6 12.8c-.1-.1-3-2.2-7.2-4.3c-4.1-2.1-9.8-4.6-16.4-7.3c-13.2-5.3-30.4-11.3-48.7-16.9c-32.4-9.84-68.89-18.34-93.24-20.24c-9.14 12.07-17.4 24.64-22.72 35.84c63.22 13.9 134.16 40.1 173.46 79.3l3.4 3.4l-1 4.8s-3 15.4-3 33.8s3.8 38.8 13.5 48.5c9.7 9.8 30.2 13.6 48.6 13.6s33.8-3 33.8-3l4.8-1l3.4 3.4c39.2 39.3 65.4 110.1 79.3 173.4c11.2-5.3 23.7-13.6 35.8-22.7c-1.9-24.4-10.3-60.8-20.2-93.1c-5.6-18.4-11.6-35.6-16.9-48.8c-2.7-6.6-5.2-12.3-7.3-16.4c-2.1-4.2-4.2-7.1-4.3-7.2l12.8-12.6c3.2 3.2 5.1 6.7 7.6 11.6c2.4 4.9 5.1 10.9 7.9 17.9c5.6 13.8 11.7 31.4 17.4 50.2c8.6 28.4 16.4 59.4 19.7 85c15.4-13.1 27.6-25.1 34.6-32.1c-12.7-64.7-26.1-151.4-62.6-212.2l-1.8-3l.7-3.4s3-15.4 3.1-33.8c0-8.3-.8-17-2.5-25c1.6 11-.2 23.4-4.4 36c-7.6 22.8-23.4 47.5-45.6 69.8c-22.3 22.2-47 38-69.8 45.6s-45.2 7.3-59.4-6.9c-14.1-14.1-14.5-36.6-6.8-59.3c7.5-22.8 23.3-47.5 45.6-69.8s46.9-38.1 69.8-45.6c12.3-4.19 24.6-5.97 35.4-4.51C371.6 95.74 363.1 95 355 95c-18.4 0-33.8 3.06-33.8 3.06l-3.5.68l-2.9-1.79c-60.9-36.55-147.5-49.9-212.2-62.62M371.9 115c-6.4-.1-13.9 1.2-22.3 4c-14.2 4.7-30.3 13.7-46 26.3c5.1-3.1 10.2-5.7 15.2-7.8c7.9-3.2 15.4-5.1 22.5-5.2c7.2 0 14.5 2 19.7 7.3c1.7 1.7 3 3.5 4.1 5.5c-9-3.9-19.5-1.8-26.4 5.1c-9.4 9.4-9.4 24.6 0 34c5.3 5.2 12.6 7.7 20 6.8c-6.8 13-17 26.6-29.9 39.4c-15.9 16-33 27.8-48.6 34.3c-7 2.9-13.7 4.7-20.2 5c7.6 1.5 17.4.6 29.1-3.3c19.4-6.4 42.2-20.7 62.7-41.3c20.6-20.6 34.9-43.3 41.3-62.7c6.4-19.3 4.8-33.7-2.5-40.9c-4.1-4.1-10.5-6.4-18.7-6.5M30.64 135.9c-.48 5.1.53 12.6 4.04 22.1c5.19 14.2 15.06 32.1 28.35 51.7C89.6 249 129.7 295.6 173.1 338.9c43.3 43.4 89.9 83.5 129.2 110.1c19.6 13.3 37.5 23.1 51.7 28.3c9.5 3.5 17 4.5 22.1 4c-5.1-23.3-12.1-47.8-20.7-71.2c-49.3-29.2-92.9-61.9-131.9-99.1c-4.7-2.5-9.2-5.6-13.1-9.5a50.9 50.9 0 0 1-9.5-13.2c-37.2-38.9-69.8-82.5-99-131.7c-23.36-8.7-47.92-15.7-71.26-20.7M130 168c19.1 30.3 39.7 58.2 62 84c-.2-4-.3-8-.3-11.8c0-15.7 1.7-26.8 2.6-32.2c-16.1-15-38.7-28.5-64.3-40m174 149.7c-5.4.9-16.5 2.6-32.2 2.6c-3.8 0-7.8-.1-11.9-.4c25.9 22.4 53.8 43 84.1 62.1c-11.5-25.5-25-48.2-40-64.3"/></svg>`,
    quality : `Common`,
    tag: 'Equip',
    effect : function() { rogueRandomGear("Ring") }
}

relic.RandomTrinket = {
    name: 'Random Trinket',
    description : function() { return `Receive a random trinket` },
    svg : `<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 512 512"><path fill="currentColor" d="M50.826 18C63.09 37.645 78.948 61.515 97.252 85.465c8.806 11.522 18.178 23.057 27.992 34.156a27.1 27.1 0 0 1 5.83-7.068a27.1 27.1 0 0 1 7.824-4.688c-9.537-10.77-18.713-22.036-27.345-33.33C96.514 54.86 83.159 35.21 72.133 18zm389.041 0c-11.026 17.21-24.381 36.859-39.42 56.535c-8.631 11.294-17.806 22.559-27.343 33.328a27.1 27.1 0 0 1 7.824 4.688a27.1 27.1 0 0 1 5.83 7.068c9.813-11.098 19.184-22.633 27.99-34.154c18.304-23.95 34.163-47.82 46.426-67.465zm-78.385 105.752a19 19 0 0 0-3.462.459c-4.923 1.087-10.623 4.336-15.194 9.654s-6.93 11.445-7.265 16.475c-.336 5.03 1.081 8.54 3.648 10.746s6.247 3.079 11.17 1.992s10.626-4.338 15.197-9.656s6.929-11.443 7.264-16.473s-1.08-8.541-3.647-10.748c-1.925-1.655-4.477-2.559-7.71-2.45zm-210.964.002c-3.233-.11-5.784.794-7.71 2.45c-2.566 2.206-3.983 5.715-3.648 10.745s2.695 11.155 7.266 16.473s10.27 8.57 15.193 9.656s8.607.216 11.174-1.99s3.98-5.718 3.645-10.748c-.336-5.03-2.691-11.155-7.262-16.473s-10.275-8.57-15.197-9.656a19 19 0 0 0-3.461-.457m43.199 35.035c-1.272 5.96-4.184 11.532-8.965 15.738c12.015 8.42 24.372 15.304 36.965 19.95l-4.297-21.487c-7.848-3.8-15.778-8.584-23.703-14.2zm124.568 0c-7.925 5.617-15.857 10.402-23.705 14.201l-4.297 21.487c12.593-4.646 24.95-11.53 36.965-19.95c-4.781-4.206-7.69-9.778-8.963-15.738M234.98 169l12.4 62h17.242l12.4-62zm-8.141 51.082c-2.807 3.896-5.507 8.361-8.043 13.434C208.032 255.04 201 285.87 201 320s7.032 64.959 17.795 86.484C229.558 428.01 243.19 439 256 439s26.442-10.99 37.205-32.516C303.968 384.96 311 354.13 311 320s-7.032-64.959-17.795-86.484c-2.536-5.073-5.236-9.538-8.043-13.434L279.38 249h-46.76zm-43.127 8.217a87 87 0 0 0-4.041.058c-28.134 1.064-52.15 15.419-73.293 35.168c-19.685 18.388-35.63 41.18-48.29 61.676c21.541-12.732 46.572-26.079 70.741-35.183c18.61-7.01 36.408-11.642 52.168-10.774c1.722.095 3.422.274 5.102.518c2.933-18.506 7.86-35.372 14.42-49.733c-5.759-1.105-11.364-1.682-16.807-1.73m144.578 0c-5.443.048-11.048.625-16.807 1.73c6.56 14.36 11.487 31.227 14.42 49.733c1.68-.244 3.38-.423 5.102-.518c15.76-.868 33.558 3.763 52.168 10.774c24.17 9.104 49.2 22.451 70.74 35.183c-12.66-20.495-28.604-43.288-48.289-61.676c-21.143-19.75-45.159-34.104-73.293-35.168a87 87 0 0 0-4.04-.058zM235.916 263h40.168L295 284.62v69.962l-39 62.398l-39-62.398V284.62zm8.168 18L235 291.38v58.038l21 33.6l21-33.6v-58.037L267.916 281zm-61.055 41.436c-35.701 3.372-54.91 22.392-68.078 47.367c-9.357 17.748-14.703 38.448-18.797 58.22c14.458-18.095 29.949-35.572 45.639-48.222c12.3-9.918 24.722-17.233 37.904-18.688a34.3 34.3 0 0 1 6.535-.076c-1.98-12.225-3.083-25.174-3.203-38.601m145.942 0c-.12 13.427-1.222 26.376-3.203 38.601a34.3 34.3 0 0 1 6.535.076c13.182 1.455 25.603 8.77 37.904 18.688c15.69 12.65 31.181 30.127 45.639 48.222c-4.094-19.772-9.44-40.472-18.797-58.22c-13.168-24.975-32.377-43.995-68.078-47.367m-92.84 129.7L256 491.874l19.87-39.736C269.69 455.27 263.05 457 256 457s-13.69-1.729-19.87-4.863z"/></svg>`,
    quality : `Common`,
    tag: 'Equip',
    effect : function() { rogueRandomGear("Trinket") }
}





relic.Mango = {
    name: 'Mango',
    description : function() { return `+ 100 Max Health` },
    img : 1,
    quality : `Uncommon`,
    stats : function() { stat.MaxHealth += 100 }
}

relic.WoodenBat = {
    name: 'Wooden Bat',
    description : function() { return `+ 100 Power` },
    img : 2,
    quality : `Uncommon`,
    stats : function() { stat.Power += 100 }
}

relic.BearFigurine = {
    name: 'Bear Figurine',
    description : function() { return `+ 20% Crit Damage` },
    img : 3,
    quality : `Uncommon`,
    stats : function() { stat.CritDamage += 20 }
}

relic.SkullMedal = {
    name: 'Skull Medal',
    description : function() { return `+ 5% Crit Chance` },
    img : 5,
    quality : `Uncommon`,
    stats : function() { stat.CritChance += 5 }
}

relic.CrystalClock = {
    name: 'Crystal Clock',
    description : function() { return `+ 8% Attack Speed` },
    img : 6,
    quality : `Uncommon`,
    stats : function() { stat.AttackSpeed += 8 }
}

statHidden.extraSkillDamage = 0

relic.Calcium = {
    name: 'Calcium',
    description : function() { return `+ 10% Weapon Skill Damage` },
    img : 8,
    quality : `Uncommon`,
    stats : function() { statHidden.extraSkillDamage += 0.10 }
}

relic.Shodan = {
    name: 'Shodan',
    description : function() { return `+ 5% Dodge Chance` },
    img : 9,
    quality : `Uncommon`,
    stats : function() { stat.DodgeChance += 5 }
}

relic.GarlicCoffee = {
    name: 'Garlic Coffee',
    description : function() { return `+ 1 Extra Life` },
    img : 4,
    quality : `Rare`,
    stats : function() { stat.ExtraLives += 1 }
}

statHidden.extraMultishot = 0
statHidden.extraSkillMultishot = 0

relic.MutantSpider = {
    name: 'Mutant Spider',
    description : function() { return `+ 1 Multishot` },
    img : 7,
    quality : `Epic`,
    stats : function() { statHidden.extraMultishot+=1 }
}

statHidden.skamtebord = 0

relic.Skamtebord = {
    name: 'Skamtebord',
    description : function() { return `Critical hits increase Attack Speed by 5%. Stacks up to 3 times` },
    img : 10,
    quality : `Rare`,
    stats : function() { statHidden.skamtebord+=1 }
}

statHidden.extraSkillChance = 0

relic.BrickUmbrella = {
    name: 'Brick Umbrella',
    description : function() { return `+ 10% Weapon Skill Chance` },
    img : 11,
    quality : `Rare`,
    stats : function() { statHidden.extraSkillChance += 0.10 }
}

statHidden.gemstoneHeart = 0

relic.GemstoneHeart = {
    name: 'Gemstone Heart',
    description : function() { return `Critical Hits heal for 5% of their damage` },
    img : 12,
    quality : `Rare`,
    stats : function() { statHidden.gemstoneHeart += 1 }
}

statHidden.extraGearChoice = 0
relic.ChoiceCard = {
    name: 'Choice Card',
    description : function() { return `+ 1 Random gear choice (up to 5)` },
    img : 13,
    quality : `Rare`,
    stats : function() { statHidden.extraGearChoice += 1 }
}

statHidden.extraRelicChoice = 0
relic.ChoiceCard2 = {
    name: 'Choice Card?!',
    description : function() { return `+ 1 Random relic choice (up to 5)` },
    img : 14,
    quality : `Epic`,
    stats : function() { statHidden.extraRelicChoice += 1 }
}

relic.AncientPrinter = {
    name: 'Ancient Printer',
    description : function() { return `Every 2 turns, select a random acquired relic and make a copy of it` },
    img : 15,
    quality : `Epic`,
    stats : function() { statHidden.ancientPrinter += 1 }
}






