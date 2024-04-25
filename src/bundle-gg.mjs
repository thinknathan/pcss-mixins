// @ts-check

import * as fs from 'fs';
import * as path from 'path';
import { svgToTinyDataUri } from './mini-svg-data-uri.mjs';

function main() {
	const dir = process.cwd() + '/src/gg';

	const svgFiles = fs
		.readdirSync(dir)
		.filter((file) => path.extname(file) === '.svg');
	let css =
		'/** Mixins | https://github.com/thinknathan/pcss-mixins/ */\n/** css.gg v2.1.1 | MIT License Copyright (c) 2019 css.gg | https://github.com/astrit/css.gg */\n\n';
	for (const svgFile of svgFiles) {
		const svgContents = fs.readFileSync(path.join(dir, svgFile), 'utf8');
		css += `@define-mixin gg-${svgFile.replace(
			'.svg',
			'',
		)} { background-image: url(${
			'"' + svgToTinyDataUri(svgContents) + '"'
		}); }\n\n`;
	}
	fs.writeFileSync('./mixins/_gg-icons.css', css);
}

main();
