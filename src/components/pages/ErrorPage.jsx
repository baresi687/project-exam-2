import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <>
      <main className={'mt-[120px] min-h-[55vh] sm:mt-12'}>
        <section id={'venues'} className={'mt-[88px] mb-12 sm:mt-12'}>
          <div className={'container mx-auto px-4 max-w-7xl'}>
            <h1 className={'text-4xl font-bold mb-6'}>404 Page not found</h1>
            <Link className={'text-rose-800 font-semibold underline-offset-4 decoration-2 hover:underline'} to={'/'}>
              Home
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default ErrorPage;
