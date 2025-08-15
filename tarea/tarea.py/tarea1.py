# 1. Convertir decimal a binario, octal y hexadecimal
decimal = int(input("Ingrese un número decimal: "))

# Decimal a binario
num = decimal
binario = ""
if num == 0:
    binario = "0"
while num > 0:
    residuo = num % 2
    binario = str(residuo) + binario
    num //= 2

# Decimal a octal
num = decimal
octal = ""
if num == 0:
    octal = "0"
while num > 0:
    residuo = num % 8
    octal = str(residuo) + octal
    num //= 8

# Decimal a hexadecimal
num = decimal
hex_chars = "0123456789ABCDEF"
hexadecimal = ""
if num == 0:
    hexadecimal = "0"
while num > 0:
    residuo = num % 16
    hexadecimal = hex_chars[residuo] + hexadecimal
    num //= 16

print("Binario:", binario)
print("Octal:", octal)
print("Hexadecimal:", hexadecimal)

