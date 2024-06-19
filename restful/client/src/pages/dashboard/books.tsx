import DataTable from '@/components/core/data-table';
import { Column } from '@/components/core/data-table/types';
import useGet from '@/hooks/useGet';
import { Book } from '@/utils/types';

const BooksPage = () => {
   const { data, isLoading, refetch, error } = useGet<Book[]>('/books', { defaultData: [] });
   const columns: Column<Book>[] = [
      { key: 'name', header: 'Book Name' },
      { key: 'author', header: 'Book Author' },
      { key: 'publisher', header: 'Publisher' },
      { key: 'publicationYear', header: 'Year Published' },
      { key: 'subject', header: 'Subject' },
   ];
   return (
      <div className=" p-5 w-full h-screen">
         <DataTable onRefresh={refetch} loading={isLoading} data={data ?? []} title={'Books'} columns={columns} />
      </div>
   );
};

export default BooksPage;
