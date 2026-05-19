
export const queryKeys = {
    reservation: {
        all: ['reservation'] as const,
        assign: () => [...queryKeys.reservation.all, 'assign'] as const
    },
    menu: {
        all: ['menu'] as const,
        list: () => [...queryKeys.menu.all, 'list'] as const
    },
    order: {
        all: ['order'] as const,
        create: () => [...queryKeys.order.all, 'create'] as const
    }
}

