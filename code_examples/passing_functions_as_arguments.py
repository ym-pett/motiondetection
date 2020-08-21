# illustration of FuncAnimation inner workings

names = 'abcdef'

def plotter(i):
    print(f'plot-{names[i]}')

def runner(callback, indicies):
    for index in indicies:
        callback(index)

def main():
    runner(plotter, [0, 1, 2, 3, 4, 5])

if __name__ == '__main__':
    main()
