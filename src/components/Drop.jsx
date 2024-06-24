import { useState } from 'react';

const Drop = () => {
	const [visibleSection, setVisibleSection] = useState(null);

	const handleMenuItemClick = (section) => {
		setVisibleSection(section === visibleSection ? null : section);
	};

	return (
		<div>
			<div className="relative inline-block text-left">
				<div>
					<button
						type="button"
						className="flex  hover:bg-[#6d7eff] justify-center items-center gap-2 bg-[#00309e] text-white px-4 py-3 m-2 rounded-full"
						id="menu-button"
						aria-expanded={!!visibleSection}
						aria-haspopup="true"
						onMouseEnter={() => handleMenuItemClick('menu')}
					>
						Our Services
						<svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path
								fillRule="evenodd"
								d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>

				{visibleSection === 'menu' && (
					<div
						className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="menu-button"
						tabIndex="-1"
					>
						<div className="py-1" role="none">
							<a

								className=" hover:bg-[#6d7eff] hover:text-white text-gray-700 block px-4 py-2 text-sm"
								role="menuitem"
								tabIndex="-1"
								id="menu-item-0"
								onClick={() => handleMenuItemClick('section1')}
							>
								Network Design
							</a>
							<a

								className=" hover:bg-[#6d7eff] hover:text-white text-gray-700 block px-4 py-2 text-sm"
								role="menuitem"
								tabIndex="-1"
								id="menu-item-1"
								onClick={() => handleMenuItemClick('section2')}
							>
								Network Inventory Management
							</a>
							<a

								className=" hover:bg-[#6d7eff] hover:text-white text-gray-700 block px-4 py-2 text-sm"
								role="menuitem"
								tabIndex="-1"
								id="menu-item-2"
								onClick={() => handleMenuItemClick('section3')}
							>
								Software Systems Design and Databases
							</a>
							<a

								className=" hover:bg-[#6d7eff] hover:text-white text-gray-700 block px-4 py-2 text-sm"
								role="menuitem"
								tabIndex="-1"
								id="menu-item-2"
								onClick={() => handleMenuItemClick('section4')}
							>
								Dedicated Admin Personnel
							</a>
							<a

								className=" hover:bg-[#6d7eff] hover:text-white text-gray-700 block px-4 py-2 text-sm"
								role="menuitem"
								tabIndex="-1"
								id="menu-item-2"
								onClick={() => handleMenuItemClick('section5')}
							>
								Material Guidance and Supplier Advisory
							</a>
							<a

								className=" hover:bg-[#6d7eff] hover:text-white text-gray-700 block px-4 py-2 text-sm"
								role="menuitem"
								tabIndex="-1"
								id="menu-item-2"
								onClick={() => handleMenuItemClick('section6')}
							>
								Field Surveyors
							</a>
						</div>
					</div>
				)}
			</div>

			<SectionNetwork id="section1"  visibleSection={visibleSection} handleMenuItemClick={handleMenuItemClick}>
			</SectionNetwork>

			<SectionInventory id="section2"  visibleSection={visibleSection} handleMenuItemClick={handleMenuItemClick}>
			</SectionInventory>

			<SectionDesign id="section3" visibleSection={visibleSection} handleMenuItemClick={handleMenuItemClick}>
			</SectionDesign>

			<SectionAdmin id="section4"  visibleSection={visibleSection} handleMenuItemClick={handleMenuItemClick}>
			</SectionAdmin>

			<SectionGuidance id="section5" visibleSection={visibleSection} handleMenuItemClick={handleMenuItemClick}>
			</SectionGuidance>

			<SectionField id="section6"  visibleSection={visibleSection} handleMenuItemClick={handleMenuItemClick}>
			</SectionField>

		</div>
	);
};

export default Drop;
