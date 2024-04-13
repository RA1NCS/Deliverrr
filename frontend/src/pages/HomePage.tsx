import landingImage from '../assets/landing.png'
import appDownloadImage from '../assets/appDownload.png'

const HomePage = () => {
	return (
		<div className="flex flex-col gap-12">
			{/* Image box */}
			<div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
				<h1 className="text-4xl font-bold tracking-tight text-red-600 font-poppins">Tuck into a takeaway today!</h1>
				<span className="text-xl font-poppins">Food is just a click away!</span>
			</div>

			{/* Photo Grid */}
			<div className="grid md:grid-cols-2 gap-5">
				<img src={landingImage} />
				<div className="flex flex-col items-center justify-center gap-5 text-center font-poppins">
					<span className="font-bold text-3xl tracking-tighter font-poppins">Order takeaway even faster!</span>
					<span>Download the Deliverrr App for faster ordering and personalized recommendations</span>
					<img src={appDownloadImage} />
				</div>
			</div>
		</div>
	)
}

export default HomePage
