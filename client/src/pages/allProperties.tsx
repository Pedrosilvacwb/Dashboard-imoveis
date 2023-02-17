import { Add } from '@mui/icons-material';
import { useTable } from '@pankod/refine-core';
import {
  Box,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
} from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';

import { PropertyCard, CustomButton } from 'components';
import { useMemo } from 'react';

const AllProperties = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();
  const properties = data?.data ?? [];
  const currentPrice = sorter.find((item) => item.field === 'price')?.order;

  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc' }]);
  };
  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      'field' in item ? item : [],
    );

    return {
      title: logicalFilters.find((item) => item.field === 'title')?.value || '',
      propertyType:
        logicalFilters.find((item) => item.field === 'propertyType')?.value ||
        '',
    };
  }, [filters]);

  if (isLoading) return <Typography>Carregando...</Typography>;
  if (isError) return <Typography>Ocorreu um erro</Typography>;
  return (
    <Box>
      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142D">
            {!properties.length
              ? 'Não existem propriedades cadastradas'
              : 'Propriedades'}
          </Typography>
          <Box
            mb={2}
            mt={3}
            display="flex"
            width="84%"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box
              display="flex"
              gap={2}
              flexWrap="wrap"
              mb={{ xs: '20px', sm: 0 }}
            >
              <CustomButton
                title={`Ordenar ${currentPrice === 'asc' ? '↑' : '↓'}`}
                handleClick={() => toggleSort('price')}
                backgroundColor="#475be8"
                color="#FCFCFC"
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Buscar por nome"
                onChange={(e) => {
                  setFilters([
                    {
                      field: 'title',
                      operator: 'contains',
                      value: e.currentTarget.value
                        ? e.currentTarget.value
                        : undefined,
                    },
                  ]);
                }}
                value={currentFilterValues.title}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue=""
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: 'propertyType',
                        operator: 'eq',
                        value: e.target.value ? e.target.value : undefined,
                      },
                    ],
                    'replace',
                  );
                }}
                value={currentFilterValues.propertyType}
              >
                <MenuItem value="">Todas</MenuItem>
                {[
                  'Apartment',
                  'Villa',
                  'Farmhouse',
                  'Condos',
                  'Townhouse',
                  'Duplex',
                  'Studio',
                  'Chalet',
                ].map((type) => (
                  <MenuItem key={type} value={type.toLowerCase()}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomButton
          title="Adicionar Propriedade"
          handleClick={() => navigate('/propriedades/create')}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>

      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {properties.map((prop) => (
          <PropertyCard
            key={prop._id}
            id={prop._id}
            title={prop.title}
            price={prop.price}
            location={prop.location}
            photo={prop.photo}
          />
        ))}
      </Box>

      {properties.length > 0 && (
        <Box display="flex" gap={2} mt={3} flexWrap="wrap">
          <CustomButton
            title="Prev"
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={!(current > 1)}
          />

          <Box
            display={{ sx: 'hidden', sm: 'flex' }}
            alignItems="center"
            gap="5px"
          >
            Página{' '}
            <strong>
              {current} de {pageCount}
            </strong>
          </Box>
          <CustomButton
            title="Next"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={current === pageCount}
          />

          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue={10}
            onChange={(e) => {
              setPageSize(e.target.value ? Number(e.target.value) : 10);
            }}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <MenuItem key={size} value={size}>
                Mostrar {size}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default AllProperties;
