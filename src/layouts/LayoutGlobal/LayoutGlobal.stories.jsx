import LayoutGlobalComponent from './LayoutGlobal';
import DocsDescription from './LayoutGlobal.docs.md';

import './layout-global-story.css';

export default {
	title: 'Layouts/Global',
	component: LayoutGlobalComponent,
	parameters: {
		componentSubtitle:
			'A component to use as the base layout for the Pantheon dashboard',
		docs: {
			description: {
				component: DocsDescription,
			},
			source: {
				excludeDecorators: true,
			},
		},
		layout: 'fullscreen',
	},
	argTypes: {
		hasSecondaryMainNav: {
			control: { type: null },
		},
		showSecondary: {
			table: { disable: true },
		},
	},
	decorators: [],
};

const Template = (args) => (
	<LayoutGlobalComponent {...args}>
		<nav slot='main-nav' className='pds-global-navigation'>
			<p id='main-nav-label'>Main site navigation</p>
			<ul aria-labelledby='main-nav-label'>
				<li>
					<a href='#'>Nav item 1</a>
				</li>
				<li>
					<a href='#'>Nav item 2</a>
				</li>
				<li>
					<a href='#'>Nav item 3</a>
				</li>
				<li>
					<a href='#'>Nav item 4</a>
				</li>
			</ul>
		</nav>
		{args.showSecondary && (
			<nav slot='main-nav' className='pds-global-navigation__secondary-nav'>
				<p id='main-nav-secondary-label'>Secondary site navigation</p>
				<ul aria-labelledby='main-nav-secondary-label'>
					<li>
						<a href='#'>Nav item 1</a>
					</li>
					<li>
						<a href='#'>Nav item 2</a>
					</li>
					<li>
						<a href='#'>Nav item 3</a>
					</li>
					<li>
						<a href='#'>Nav item 4</a>
					</li>
				</ul>
			</nav>
		)}

		<div slot='main-content-header' className='pds-main-content__header'>
			<span>Pantheon</span>
			<div className='pds-main-content__header-utilities'>
				<input type='search' placeholder='search' />
			</div>
		</div>

		<div slot='main-content' className='pds-main-content'>
			<h1>Main content</h1>

			<p>Welcome to the Pantheon dashboard!</p>

			<p>
				Wolf cillum pariatur, magna cronut roof party knausgaard esse migas blog
				drinking vinegar +1. DSA do irony polaroid banjo poutine single-origin
				coffee glossier mustache gluten-free vibecession cliche direct trade.
				Sus butcher cold-pressed et banh mi. Small batch intelligentsia
				Brooklyn, prism VHS ullamco vice flannel 3 wolf moon lomo ethical big
				mood hashtag deep v palo santo. Ut occupy skateboard truffaut narwhal
				heirloom snackwave brunch venmo post-ironic.
			</p>

			<p>
				Flexitarian cloud bread kale chips, glossier velit flannel mustache. Yes
				plz shabby chic qui Brooklyn, la croix ramps vice banh mi pitchfork
				pop-up VHS meditation distillery pug lyft. Officia blog small batch
				dolor lorem actually artisan squid. Swag reprehenderit 3 wolf moon palo
				santo.
			</p>

			<p>
				Kinfolk seitan fit excepteur, listicle church-key locavore whatever man
				braid duis celiac cardigan 90's small batch sint. Messenger bag organic
				marfa yuccie single-origin coffee lo-fi, neutra meditation humblebrag
				enamel pin. Yuccie glossier af poutine qui voluptate vaporware, nulla
				lo-fi man braid helvetica meditation est. VHS 90's in, ex ullamco
				tousled williamsburg.
			</p>

			<p>
				VHS succulents voluptate, hashtag subway tile copper mug heirloom bruh.
				Commodo ascot unicorn godard, heirloom labore cornhole. Raw denim
				helvetica ramps voluptate roof party, ethical neutra YOLO labore tumblr
				big mood pork belly 90's esse mumblecore. Pok pok +1 vinyl XOXO
				lumbersexual occaecat.
			</p>

			<p>
				Shaman pabst keffiyeh chia etsy. Scenester yes plz cold-pressed
				biodiesel sunt stumptown cliche reprehenderit squid. Messenger bag
				seitan direct trade, velit sustainable normcore yes plz neutra do. Culpa
				gastropub put a bird on it tousled sus.
			</p>

			<p>
				Try-hard helvetica affogato biodiesel flannel venmo. Veniam pour-over
				trust fund, non ramps forage austin. Sus DIY art party et est chambray
				try-hard, venmo VHS hoodie. 90's woke kogi ut lumbersexual forage cliche
				elit four loko lo-fi. Dolor ethical tonx yr selfies taiyaki.
			</p>

			<p>
				Pitchfork four loko ut occaecat. Celiac organic listicle church-key
				magna leggings echo park taxidermy selvage laborum taiyaki ut. Small
				batch cloud bread ut, dolor gluten-free vape single-origin coffee irony
				humblebrag. Pork belly 90's fit velit.
			</p>

			<p>
				Helvetica kogi thundercats, id lyft big mood do. Pug 3 wolf moon
				mustache beard. Raw denim kale chips dreamcatcher tonx small batch
				normcore irure tousled magna hell of. Actually you probably haven't
				heard of them iPhone wayfarers lomo sed, blog swag meh tonx thundercats
				portland.
			</p>

			<p>
				Culpa knausgaard activated charcoal do vice quis occaecat adaptogen
				bushwick iceland keytar eu. Mollit pinterest taxidermy heirloom
				vibecession. Ad pop-up vinyl cornhole bodega boys. Schlitz irure DSA,
				lo-fi in mustache magna keffiyeh cred Brooklyn dreamcatcher authentic.
				Freegan artisan shaman scenester normcore, eiusmod sustainable chia.
			</p>

			<p>
				Hashtag vinyl DSA, bespoke poke keytar vibecession adipisicing velit
				jianbing magna tumblr cronut fugiat truffaut. Kickstarter succulents
				jianbing hashtag iceland brunch poke. Irony scenester green juice lyft
				organic cloud bread. Mollit deep v vape eiusmod activated charcoal,
				disrupt DIY officia gastropub crucifix. DSA sed pug kogi copper mug
				irure. Same thundercats sustainable dolore disrupt sint meditation
				skateboard woke helvetica.
			</p>
		</div>
	</LayoutGlobalComponent>
);

export const LayoutGlobal = Template.bind({});
LayoutGlobal.args = {
	showSecondary: false,
};
LayoutGlobal.storyName = 'Default';

export const LayoutGlobalWithSecondary = Template.bind({});
LayoutGlobalWithSecondary.args = {
	hasSecondaryMainNav: true,
	showSecondary: true,
};
LayoutGlobalWithSecondary.storyName = 'With Secondary Nav';
