import { CustomFlowbiteTheme, FlowbiteDatepickerTheme } from 'flowbite-react'

export const DateTheme: CustomFlowbiteTheme['datepicker'] = {
  root: {
    base: 'relative'
  },
  popup: {
    root: {
      base: 'absolute top-10 z-50 block pt-2',
      inline: 'relative top-0 z-auto',
      inner: 'inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700'
    },
    header: {
      base: '',
      title: 'px-2 py-3 text-center font-semibold text-primary dark:text-white',
      selectors: {
        base: 'mb-2 flex justify-between',
        button: {
          base: 'rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary',
          prev: '',
          next: '',
          view: ''
        }
      }
    },
    view: {
      base: 'p-1'
    },
    footer: {
      base: 'mt-2 flex space-x-2',
      button: {
        base: 'w-full text-white rounded-lg px-5 py-2 text-center text-sm font-medium',
        today: 'bg-primary text-white',
        clear: 'border border-primary bg-white text-primary'
      }
    }
  },
  views: {
    days: {
      header: {
        base: 'mb-1 grid grid-cols-7',
        title:
          'h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400'
      },
      items: {
        base: 'grid w-64 grid-cols-7',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-primary hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600',
          selected: 'bg-primary text-white hover:bg-cyan-600',
          disabled: 'text-gray-500'
        }
      }
    },
    months: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-primary hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600',
          selected: 'bg-cyan-700 text-white hover:bg-cyan-600',
          disabled: 'text-gray-500'
        }
      }
    },
    years: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-primary hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600',
          selected: 'bg-cyan-700 text-white hover:bg-cyan-600',
          disabled: 'text-gray-500'
        }
      }
    },
    decades: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-primary hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600',
          selected: 'bg-cyan-700 text-white hover:bg-cyan-600',
          disabled: 'text-gray-500'
        }
      }
    }
  }
}
