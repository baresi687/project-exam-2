import { useApi } from '../../hooks/useApi.js';
import { GET_VENUES as CREATE_VENUE } from '../../settings/api.js';
import { useEffect, useRef, useState } from 'react';
import { createAndEditSchema, scrollToMessage } from '../../utils/validation.js';
import { useNavigate } from 'react-router-dom';
import { getFromStorage } from '../../utils/storage.js';
import CreateAndEditVenueForm from '../shared/CreateAndEditVenueForm.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function CreateVenue() {
  const { venueManager, accessToken } = getFromStorage('user');
  const createForm = useForm({ resolver: yupResolver(createAndEditSchema) });
  const { data, created, isLoading, isError, errorMsg, fetchData } = useApi();
  const formErrorRef = useRef(null);
  const [isFormError, setIsFormError] = useState(false);
  const navigate = useNavigate();

  function onSubmit(data) {
    data.media = [data.media];
    fetchData(CREATE_VENUE, 'POST', accessToken, data);
  }

  useEffect(() => {
    if (!accessToken || !venueManager) {
      navigate('/', { replace: true });
    }
  }, [accessToken, navigate, venueManager]);

  useEffect(() => {
    if (isError) {
      setIsFormError(true);
      scrollToMessage(formErrorRef);
    }
  }, [isError]);

  useEffect(() => {
    if (created) {
      navigate(`/venues/venue-details/${data.id}`);
    }
  }, [created, data, navigate]);

  return (
    <>
      <main className={'mt-[120px] min-h-[50vh] sm:mt-12'}>
        <section id={'profile'} className={'mt-[88px] mb-12 sm:mt-12 md:mb-28'}>
          <div className={'container mx-auto px-4 max-w-7xl'}>
            <CreateAndEditVenueForm
              form={createForm}
              title={'Create Venue'}
              btnTitle={'Create Venue'}
              onSubmit={onSubmit}
              isLoading={isLoading}
              isFormError={isFormError}
              setIsFormError={setIsFormError}
              errorMsg={errorMsg}
              formErrorRef={formErrorRef}
              borderAndShadow
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default CreateVenue;
