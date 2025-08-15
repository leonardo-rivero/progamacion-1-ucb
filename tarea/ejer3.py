# Transformar de hexadecimal a binario sin funciones, sin bin(), sin len(), sin upper()

# Entrada
hexadecimal = input("Ingrese un número hexadecimal: ")

# Lista de caracteres hexadecimales (mayúsculas y minúsculas)
hex_chars = "0123456789ABCDEF"
hex_chars_min = "0123456789abcdef"

# Contar longitud manualmente
longitud = 0
while True:
    try:
        hexadecimal[longitud]
        longitud += 1
    except IndexError:
        break

# Paso 1: Hexadecimal a decimal
decimal = 0
potencia = 0
i = longitud - 1
while i >= 0:
    valor = 0
    j = 0
    while True:
        try:
            # Comparar con mayúsculas
            if hexadecimal[i] == hex_chars[j]:
                valor = j
            # Comparar con minúsculas
            if hexadecimal[i] == hex_chars_min[j]:
                valor = j
            j += 1
        except IndexError:
            break
    decimal += valor * (16 ** potencia)
    potencia += 1
    i -= 1

# Paso 2: Decimal a binario
num = decimal
binario = ""
if num == 0:
    binario = "0"
while num > 0:
    residuo = num % 2
    binario = str(residuo) + binario
    num //= 2

# Salida
print("El equivalente en binario es:", binario)



