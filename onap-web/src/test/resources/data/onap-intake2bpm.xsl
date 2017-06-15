<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:template match="/">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="*">
        <xsl:element name="{local-name(.)}">
            <xsl:apply-templates select="*|@*|text()|comment()"/>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="@*|text()|comment()">
        <xsl:copy>
            <xsl:apply-templates select="*|@*|text()|comment()"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="@type">
        <xsl:attribute name="type" namespace="http://www.w3.org/2001/XMLSchema-instance">
            <xsl:value-of select="."/>
        </xsl:attribute>
    </xsl:template>
    
    <xsl:template match="@xsi:nil">
    </xsl:template>
    
</xsl:stylesheet>