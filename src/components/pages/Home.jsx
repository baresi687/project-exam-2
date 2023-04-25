function Home() {
  return (
    <>
      <main className={'mt-[120px] sm:mt-12'}>
        <section id={'headline'}>
          <div className={'container mx-auto px-4 max-w-7xl'}>
            <div className={'bg-cover bg-headline py-16 px-6 text-white'}>
              <div id={'headline-content'} className={'sm:m-auto w-fit'}>
                <h1 className={'text-4xl font-bold mb-4'}>Welcome to Holidaze</h1>
                <p className={'mt-2 text-lg'}>Book your dream venue at affordable prices</p>
                <p className={'mt-2 text-lg'}>Or turn your property into venue and rent it out</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
