function Maintenance() {
    return (  <div className="fixed inset-0 z-[9898989] bg-white flex flex-col items-center justify-center px-4">
       
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 dark:text-casagray-100 mt-12">
            We are working
          </p>
          <p className="md:text-lg lg:text-xl text-casagray-600 dark:text-casagray-200 mt-8">
           {"Sorry, The site is under maintenance. . ."}
          </p>
          
        </div>
      </div>);
}

export default Maintenance;