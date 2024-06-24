import React from 'react'
import ManageCard from '../components/ManageCard'
import { managers } from '../constants'

const Managers = () => {
	return (
		<section className="max-container">

			<h3 className="font-palanquin text-center text-4xl font-bold">
				Meet our
				<span className="text-blue-700 font-bold"> Managers</span>
			</h3>
			<p className="text-center mt-4 m-auto info-text max-w-xl">
				"Meet the visionary minds shaping our company's journey towards success.
				Our dedicated team of managers brings a wealth of experience, passion,
				and innovation to every aspect of our operations.
				Get to know the driving forces behind our company's growth and discover the leadership that propels us towards excellence."
			</p>
			<div className="flex flex-1 justify-evenly items-center max-lg:flex-col gap-14 mt-24">
				{managers.map((manage) => (
					<ManageCard key={manage.customerName}
					imgURL={manage.imgURL}
						customerName={manage.customerName}
						title={manage.title}
						feedback={manage.feedback}
					/>

				))}
			</div>

		</section>
	)
}

export default Managers