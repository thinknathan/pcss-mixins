// @ts-check

import * as fs from 'fs';
import * as path from 'path';
import { svgToTinyDataUri } from './mini-svg-data-uri.mjs';

function main() {
	const dir = process.cwd() + '/src/lucide';

	const svgFiles = fs
		.readdirSync(dir)
		.filter((file) => path.extname(file) === '.svg');
	let css =
		'/** Mixins | https://github.com/thinknathan/pcss-mixins/ */\n/** Lucide v0.373.0 | ISC License	Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022. | https://github.com/lucide-icons/lucide */\n\n';
	for (const svgFile of svgFiles) {
		const svgContents = fs.readFileSync(path.join(dir, svgFile), 'utf8');
		css += `@define-mixin lu-${svgFile.replace(
			'.svg',
			'',
		)} { background-image: url(${
			'"' + svgToTinyDataUri(svgContents) + '"'
		}); }\n\n`;
	}
	fs.writeFileSync('./mixins/_lucide-icons.css', css);
}

main();
