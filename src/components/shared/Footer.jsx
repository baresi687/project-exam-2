import newsletterImg from '../../assets/newsletter.svg';
function Footer() {
  return (
    <footer>
      <div id={'newsletter'} className={'bg-neutral-50 py-24'}>
        <div className={'sm:flex justify-center items-center gap-14'}>
          <img className={'mx-auto my-0 sm:h-max sm:m-0'} src={newsletterImg} alt={'Newsletter'} />
          <div className={'container mx-auto mt-8 px-4 flex flex-col gap-4 sm:max-w-[400px] sm:m-0 sm:p-0'}>
            <h3 className={'text-2xl font-bold text-center sm:text-start'}>Sign up for our newsletter</h3>
            <p className={'text-center sm:text-start sm:text-lg'}>Receive travel tips and special offers on venues.</p>
            <div className={'flex gap-4'}>
              <label className={'w-full'}>
                <input
                  aria-label={'Newsletter Sign Up'}
                  className={'border-gray-200 border rounded h-10 indent-4 w-full placeholder:text-zinc-500'}
                  type={'text'}
                  placeholder={'Your email address'}
                />
              </label>
              <button
                className={
                  'shrink-0 bg-rose-800 text-white rounded h-10 w-[80px] hover:bg-rose-700 ease-out duration-200'
                }
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id={'footer-main'} className={'bg-zinc-100 pt-14 pb-24 sm:pb-6'}>
        <div className={'container mx-auto px-4 sm:sm:max-w-7xl'}>
          <div
            id={'footer-items'}
            className={'flex flex-col gap-12 pb-14 border-b border-b-neutral-200 sm:flex-row justify-between'}
          >
            <div>
              <h3 className={'font-semibold mb-3'}>Lorem Ipsum</h3>
              <ul className={'flex flex-col gap-2.5'}>
                <li className={'font-light text-sm'}>Lorem Ipsum</li>
                <li className={'font-light text-sm'}>Lorem Ipsum</li>
                <li className={'font-light text-sm'}>Lorem Ipsum</li>
                <li className={'font-light text-sm'}>Lorem Ipsum</li>
              </ul>
            </div>
            <div>
              <h3 className={'font-semibold mb-3'}>Lorem Ipsum</h3>
              <ul className={'flex flex-col gap-2.5'}>
                <li className={'font-light text-sm'}>Lorem Ipsum</li>
                <li className={'font-light text-sm'}>Lorem Ipsum</li>
                <li className={'font-light text-sm'}>Lorem Ipsum</li>
                <li className={'font-light text-sm'}>Lorem Ipsum</li>
              </ul>
            </div>
            <div>
              <h3 className={'font-semibold mb-3'}>Lorem Ipsum</h3>
              <ul className={'flex flex-col gap-2.5'}>
                <li className={'font-light text-sm'}>Lorem Ipsum</li>
                <li className={'font-light text-sm'}>Lorem Ipsum</li>
                <li className={'font-light text-sm'}>Lorem Ipsum</li>
                <li className={'font-light text-sm'}>Lorem Ipsum</li>
              </ul>
            </div>
            <div>
              <h3 className={'font-semibold mb-3'}>Lorem Ipsum</h3>
              <ul className={'flex flex-col gap-2.5'}>
                <li className={'font-light text-sm'}>Lorem Ipsum</li>
                <li className={'font-light text-sm'}>Lorem Ipsum</li>
                <li className={'font-light text-sm'}>Lorem Ipsum</li>
                <li className={'font-light text-sm'}>Lorem Ipsum</li>
              </ul>
            </div>
          </div>
          <div id={'footer-bottom'} className={'mt-6'}>
            <small className={'block font-light text-xs'}>
              © 2023 Holidaze · <span className={'font-normal'}>This website is for education purpose only</span>
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
