import { FC, useCallback, useEffect, useState } from 'react'
import GenericTable from '@components/table'
import Profile from '@components/table/components/profile'
import Card from '@components/card'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { ROUTES } from '@constants/routes'
import useIsMounted from '@client/hooks/use-is-mounted'
import { useAsyncState } from 'just-hook'
import { deleteVacances, getAllVacancies } from '@services/vacancies'
import { IVacanciesAttributes } from '@itypes/index'
import { dataModifier } from './vacances-helper'
import DeleteModal from '@components/modal/delete-modal'
import toast, { Toaster } from 'react-hot-toast'

const Vacancies: FC = () => {
  const { push } = useRouter()
  const isMounted = useIsMounted()
  const [isOpen, setIsOpen] = useState(false)
  const { setData, data } = useAsyncState<IVacanciesAttributes | any>()
  const [vacancie, setVacancie] = useState(null)

  const fetchAllVacancies = useCallback(async () => {
    try {
      const { data } = await getAllVacancies()
      if (isMounted.current) setData(dataModifier(data))
    } catch (error) {}
  }, [])

  useEffect(() => {
    fetchAllVacancies()
  }, [])

  async function handleDelete() {
    const { error, message } = await deleteVacances(vacancie)

    if (error)
      return toast.error(message, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#d85959',
          color: '#fff'
        }
      })

    if (isMounted.current) setIsOpen(false)

    toast.success(message, {
      duration: 4000,
      position: 'top-right'
    })

    fetchAllVacancies()
  }

  return (
    <Card classNames="bg-white shadow rounded-lg lg:pt-5 sm:px-6 lg:px-0">
      <Toaster />
      <DeleteModal
        title="Deseja eliminar essa vaga?"
        isOpen={isOpen}
        confirm={handleDelete}
        cancel={() => setIsOpen(false)}
      />
      <div
        className="lg:flex lg:flex-end lg:flex-end px-4 pb-4"
        style={{ justifyContent: 'flex-end' }}
      >
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button
              type="button"
              onClick={() => push(ROUTES.VACANCIES_CREATE).then()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusCircleIcon
                className="-ml-1 mr-2 h-5 w-5 text-white"
                aria-hidden="true"
                style={{ color: '#fff' }}
              />
              Nova Vaga
            </button>
          </span>
        </div>
      </div>

      <GenericTable
        columns={[
          {
            label: 'Função',
            key: 'functionType'
          },
          { key: 'limitHours', label: 'Carga horária' },
          { key: 'limitDate', label: 'Prazo para vaga' },
          { key: 'numVacancies', label: 'Nº de Vaga' },
          { key: 'experience', label: 'Ano de experiência' },
          { key: 'createdAt', label: 'Data de criação' }
        ]}
        data={(data as any) || []}
        onUpdate={(data: IVacanciesAttributes) => {
          push(`${ROUTES.VACANCIES_WITH_ID}/${data.id}/update`).then()
        }}
        onShow={(data: IVacanciesAttributes) => {
          push(`${ROUTES.VACANCIES_WITH_ID}/${data.id}/detail`).then()
        }}
        onDelete={(data: IVacanciesAttributes) => {
          setVacancie(data.id)
          setIsOpen(true)
        }}
      />
    </Card>
  )
}

export default Vacancies
